from fastapi import FastAPI
from app.database import create_db_and_tables
from app.modules.producto.routers import router as producto_router
from app.modules.categoria.routers import router as categoria_router
from app.modules.clientes.routers import router as clientes_router

# Importar modelos para que SQLModel los registre antes de create_all
import app.modules.categoria.models  # noqa: F401
import app.modules.producto.models   # noqa: F401
import app.modules.clientes.models   # noqa: F401


def create_app() -> FastAPI:
    app = FastAPI(
        title="Gestor de Productos - TP2",
        description="Migración a PostgreSQL con SQLModel. Arquitectura: Router → Service → Schema → Model.",
        version="2.0.0",
    )

    @app.on_event("startup")
    def on_startup():
        create_db_and_tables()

    app.include_router(producto_router)
    app.include_router(categoria_router)
    app.include_router(clientes_router)

    return app


app = create_app()
