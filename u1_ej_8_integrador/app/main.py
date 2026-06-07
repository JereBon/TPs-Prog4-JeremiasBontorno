from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_db_and_tables
from app.modules.producto.routers import router as producto_router
from app.modules.categoria.routers import router as categoria_router
from app.modules.clientes.routers import router as clientes_router
from app.modules.producto_categoria.routers import router as producto_categoria_router
from app.modules.ingrediente.router import router as ingrediente_router
from app.modules.pedido.router import router as pedido_router

import app.modules.categoria.models  # noqa: F401
import app.modules.producto.models   # noqa: F401
import app.modules.clientes.models   # noqa: F401
import app.modules.producto_categoria.models  # noqa: F401
import app.modules.ingrediente.models  # noqa: F401
import app.modules.pedido.models  # noqa: F401


def create_app() -> FastAPI:
    app = FastAPI(
        title="Gestor de Productos - TP3",
        version="3.0.0",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.on_event("startup")
    def on_startup():
        create_db_and_tables()

    app.include_router(producto_router)
    app.include_router(categoria_router)
    app.include_router(clientes_router)
    app.include_router(producto_categoria_router)
    app.include_router(ingrediente_router)
    app.include_router(pedido_router)

    return app


app = create_app()
