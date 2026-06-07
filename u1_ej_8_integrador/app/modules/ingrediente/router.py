from fastapi import APIRouter, HTTPException, Path, status, Depends
from typing import List
from sqlmodel import Session
from app.database import get_session
from . import schemas, service
from .unit_of_work import IngredienteUnitOfWork

router = APIRouter(prefix="/ingredientes", tags=["Ingredientes"])


def get_uow(session: Session = Depends(get_session)) -> IngredienteUnitOfWork:
    return IngredienteUnitOfWork(session)


@router.post("/", response_model=schemas.IngredienteRead, status_code=status.HTTP_201_CREATED)
def crear_ingrediente(data: schemas.IngredienteCreate, uow: IngredienteUnitOfWork = Depends(get_uow)):
    return service.crear(data, uow)


@router.get("/", response_model=List[schemas.IngredienteRead])
def listar_ingredientes(uow: IngredienteUnitOfWork = Depends(get_uow)):
    return service.listar(uow)


@router.get("/{id}", response_model=schemas.IngredienteRead)
def obtener_ingrediente(id: int = Path(..., gt=0), uow: IngredienteUnitOfWork = Depends(get_uow)):
    ingrediente = service.obtener(id, uow)
    if not ingrediente:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ingrediente no encontrado")
    return ingrediente


@router.put("/{id}", response_model=schemas.IngredienteRead)
def actualizar_ingrediente(
    data: schemas.IngredienteUpdate,
    id: int = Path(..., gt=0),
    uow: IngredienteUnitOfWork = Depends(get_uow),
):
    actualizado = service.actualizar(id, data, uow)
    if not actualizado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ingrediente no encontrado")
    return actualizado


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_ingrediente(id: int = Path(..., gt=0), uow: IngredienteUnitOfWork = Depends(get_uow)):
    if not service.eliminar(id, uow):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ingrediente no encontrado")
