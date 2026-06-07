from fastapi import APIRouter, HTTPException, Path, status, Depends
from typing import List
from sqlmodel import Session
from app.database import get_session
from . import schemas, service
from .unit_of_work import PedidoUnitOfWork

router = APIRouter(prefix="/pedidos", tags=["Pedidos"])


def get_uow(session: Session = Depends(get_session)) -> PedidoUnitOfWork:
    return PedidoUnitOfWork(session)


@router.post("/", response_model=schemas.PedidoRead, status_code=status.HTTP_201_CREATED)
def crear_pedido(data: schemas.PedidoCreate, uow: PedidoUnitOfWork = Depends(get_uow)):
    return service.crear(data, uow)


@router.get("/", response_model=List[schemas.PedidoRead])
def listar_pedidos(uow: PedidoUnitOfWork = Depends(get_uow)):
    return service.listar(uow)


@router.get("/{id}", response_model=schemas.PedidoRead)
def obtener_pedido(id: int = Path(..., gt=0), uow: PedidoUnitOfWork = Depends(get_uow)):
    pedido = service.obtener(id, uow)
    if not pedido:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pedido no encontrado")
    return pedido


@router.get("/{id}/detalles", response_model=List[schemas.DetallePedidoRead])
def obtener_detalles(id: int = Path(..., gt=0), uow: PedidoUnitOfWork = Depends(get_uow)):
    return service.obtener_detalles(id, uow)


@router.put("/{id}", response_model=schemas.PedidoRead)
def actualizar_pedido(
    data: schemas.PedidoUpdate,
    id: int = Path(..., gt=0),
    uow: PedidoUnitOfWork = Depends(get_uow),
):
    actualizado = service.actualizar(id, data, uow)
    if not actualizado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pedido no encontrado")
    return actualizado


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_pedido(id: int = Path(..., gt=0), uow: PedidoUnitOfWork = Depends(get_uow)):
    if not service.eliminar(id, uow):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pedido no encontrado")
