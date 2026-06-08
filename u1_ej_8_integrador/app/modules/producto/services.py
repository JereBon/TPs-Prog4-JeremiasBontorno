from typing import List, Optional
from sqlmodel import Session, select
from .models import Producto
from .schemas import ProductoCreate, ProductoRead


def crear(data: ProductoCreate, session: Session) -> ProductoRead:
    nuevo = Producto(**data.model_dump())
    session.add(nuevo)
    session.commit()
    session.refresh(nuevo)
    return ProductoRead.model_validate(nuevo)


def obtener_todos(skip: int, limit: int, session: Session) -> List[ProductoRead]:
    statement = select(Producto).offset(skip).limit(limit)
    productos = session.exec(statement).all()
    return [ProductoRead.model_validate(p) for p in productos]


def obtener_por_id(id: int, session: Session) -> Optional[ProductoRead]:
    producto = session.get(Producto, id)
    if not producto:
        return None
    return ProductoRead.model_validate(producto)


def actualizar_total(id: int, data: ProductoCreate, session: Session) -> Optional[ProductoRead]:
    producto = session.get(Producto, id)
    if not producto:
        return None
    for campo, valor in data.model_dump().items():
        setattr(producto, campo, valor)
    session.add(producto)
    session.commit()
    session.refresh(producto)
    return ProductoRead.model_validate(producto)


def desactivar(id: int, session: Session) -> Optional[ProductoRead]:
    producto = session.get(Producto, id)
    if not producto:
        return None
    producto.activo = False
    session.add(producto)
    session.commit()
    session.refresh(producto)
    return ProductoRead.model_validate(producto)


def eliminar(id: int, session: Session) -> bool:
    producto = session.get(Producto, id)
    if not producto:
        return False
    session.delete(producto)
    session.commit()
    return True


def obtener_estado_stock(id: int, session: Session) -> Optional[dict]:
    producto = session.get(Producto, id)
    if not producto:
        return None
    return {
        "stock": producto.stock,
        "bajo_stock_minimo": producto.stock < producto.stock_minimo,
        "activo": producto.activo,
    }
