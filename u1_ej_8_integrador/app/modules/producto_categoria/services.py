from typing import List, Optional
from sqlmodel import Session, select
from .models import ProductoCategoria
from .schemas import ProductoCategoriaCreate, ProductoCategoriaRead


def crear(data: ProductoCategoriaCreate, session: Session) -> Optional[ProductoCategoriaRead]:
    existente = session.get(ProductoCategoria, (data.producto_id, data.categoria_id))
    if existente:
        return None
    nueva = ProductoCategoria(**data.model_dump())
    session.add(nueva)
    session.commit()
    session.refresh(nueva)
    return ProductoCategoriaRead.model_validate(nueva)


def obtener_todas(session: Session) -> List[ProductoCategoriaRead]:
    relaciones = session.exec(select(ProductoCategoria)).all()
    return [ProductoCategoriaRead.model_validate(r) for r in relaciones]


def obtener_por_producto(producto_id: int, session: Session) -> List[ProductoCategoriaRead]:
    statement = select(ProductoCategoria).where(ProductoCategoria.producto_id == producto_id)
    relaciones = session.exec(statement).all()
    return [ProductoCategoriaRead.model_validate(r) for r in relaciones]


def eliminar(producto_id: int, categoria_id: int, session: Session) -> bool:
    relacion = session.get(ProductoCategoria, (producto_id, categoria_id))
    if not relacion:
        return False
    session.delete(relacion)
    session.commit()
    return True
