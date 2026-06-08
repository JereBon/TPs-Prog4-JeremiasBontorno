from fastapi import APIRouter, HTTPException, Path, Query, status, Depends
from typing import List
from sqlmodel import Session
from app.database import get_session
from . import schemas, services

router = APIRouter(prefix="/productos", tags=["Productos"])


@router.post("/", response_model=schemas.ProductoRead, status_code=status.HTTP_201_CREATED)
def alta_producto(producto: schemas.ProductoCreate, session: Session = Depends(get_session)):
    return services.crear(producto, session)


@router.get("/", response_model=List[schemas.ProductoRead], status_code=status.HTTP_200_OK)
def listar_productos(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, le=50),
    session: Session = Depends(get_session),
):
    return services.obtener_todos(skip, limit, session)


@router.get("/{id}", response_model=schemas.ProductoRead, status_code=status.HTTP_200_OK)
def detalle_producto(id: int = Path(..., gt=0), session: Session = Depends(get_session)):
    producto = services.obtener_por_id(id, session)
    if not producto:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado")
    return producto


@router.put("/{id}", response_model=schemas.ProductoRead, status_code=status.HTTP_200_OK)
def actualizar_producto(
    producto: schemas.ProductoCreate,
    id: int = Path(..., gt=0),
    session: Session = Depends(get_session),
):
    actualizado = services.actualizar_total(id, producto, session)
    if not actualizado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado")
    return actualizado


@router.put("/{id}/desactivar", response_model=schemas.ProductoRead, status_code=status.HTTP_200_OK)
def borrado_logico(id: int = Path(..., gt=0), session: Session = Depends(get_session)):
    desactivado = services.desactivar(id, session)
    if not desactivado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado")
    return desactivado


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_producto(id: int = Path(..., gt=0), session: Session = Depends(get_session)):
    if not services.eliminar(id, session):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado")


@router.get("/{id}/stock", response_model=schemas.ProductoStockResponse, status_code=status.HTTP_200_OK)
def consultar_stock(id: int = Path(..., gt=0), session: Session = Depends(get_session)):
    resultado = services.obtener_estado_stock(id, session)
    if not resultado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado")
    return resultado
