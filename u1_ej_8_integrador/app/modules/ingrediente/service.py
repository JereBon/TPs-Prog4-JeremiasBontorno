from typing import List, Optional
from .models import Ingrediente
from .schemas import IngredienteCreate, IngredienteRead, IngredienteUpdate
from .unit_of_work import IngredienteUnitOfWork


def crear(data: IngredienteCreate, uow: IngredienteUnitOfWork) -> IngredienteRead:
    ingrediente = Ingrediente(**data.model_dump())
    uow.ingredientes.add(ingrediente)
    uow.commit()
    uow.refresh(ingrediente)
    return IngredienteRead.model_validate(ingrediente)


def listar(uow: IngredienteUnitOfWork) -> List[IngredienteRead]:
    return [IngredienteRead.model_validate(i) for i in uow.ingredientes.get_all()]


def obtener(id: int, uow: IngredienteUnitOfWork) -> Optional[IngredienteRead]:
    ingrediente = uow.ingredientes.get_by_id(id)
    if not ingrediente:
        return None
    return IngredienteRead.model_validate(ingrediente)


def actualizar(id: int, data: IngredienteUpdate, uow: IngredienteUnitOfWork) -> Optional[IngredienteRead]:
    ingrediente = uow.ingredientes.get_by_id(id)
    if not ingrediente:
        return None
    for campo, valor in data.model_dump(exclude_none=True).items():
        setattr(ingrediente, campo, valor)
    uow.ingredientes.add(ingrediente)
    uow.commit()
    uow.refresh(ingrediente)
    return IngredienteRead.model_validate(ingrediente)


def eliminar(id: int, uow: IngredienteUnitOfWork) -> bool:
    ingrediente = uow.ingredientes.get_by_id(id)
    if not ingrediente:
        return False
    uow.ingredientes.delete(ingrediente)
    uow.commit()
    return True
