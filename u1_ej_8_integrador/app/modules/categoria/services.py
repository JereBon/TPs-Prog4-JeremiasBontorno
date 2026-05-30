from typing import List, Optional
from sqlmodel import Session, select
from .models import Categoria
from .schemas import CategoriaCreate, CategoriaRead


def crear(data: CategoriaCreate, session: Session) -> CategoriaRead:
    nueva = Categoria(**data.model_dump())
    session.add(nueva)
    session.commit()
    session.refresh(nueva)
    return CategoriaRead.model_validate(nueva)


def obtener_todas(skip: int, limit: int, session: Session) -> List[CategoriaRead]:
    statement = select(Categoria).offset(skip).limit(limit)
    categorias = session.exec(statement).all()
    return [CategoriaRead.model_validate(c) for c in categorias]


def obtener_por_id(id: int, session: Session) -> Optional[CategoriaRead]:
    categoria = session.get(Categoria, id)
    if not categoria:
        return None
    return CategoriaRead.model_validate(categoria)


def actualizar_total(id: int, data: CategoriaCreate, session: Session) -> Optional[CategoriaRead]:
    categoria = session.get(Categoria, id)
    if not categoria:
        return None
    for campo, valor in data.model_dump().items():
        setattr(categoria, campo, valor)
    session.add(categoria)
    session.commit()
    session.refresh(categoria)
    return CategoriaRead.model_validate(categoria)


def desactivar(id: int, session: Session) -> Optional[CategoriaRead]:
    categoria = session.get(Categoria, id)
    if not categoria:
        return None
    categoria.activo = False
    session.add(categoria)
    session.commit()
    session.refresh(categoria)
    return CategoriaRead.model_validate(categoria)
