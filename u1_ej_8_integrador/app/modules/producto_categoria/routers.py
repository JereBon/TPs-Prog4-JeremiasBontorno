from fastapi import APIRouter, HTTPException, Path, status, Depends
from typing import List
from sqlmodel import Session
from app.database import get_session
from . import schemas, services

router = APIRouter(prefix="/producto-categorias", tags=["ProductoCategorias"])


@router.post("/", response_model=schemas.ProductoCategoriaRead, status_code=status.HTTP_201_CREATED)
def crear_relacion(rel: schemas.ProductoCategoriaCreate, session: Session = Depends(get_session)):
    nueva = services.crear(rel, session)
    if not nueva:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="La relación ya existe")
    return nueva


@router.get("/", response_model=List[schemas.ProductoCategoriaRead])
def listar_relaciones(session: Session = Depends(get_session)):
    return services.obtener_todas(session)


@router.get("/producto/{producto_id}", response_model=List[schemas.ProductoCategoriaRead])
def listar_por_producto(producto_id: int = Path(..., gt=0), session: Session = Depends(get_session)):
    return services.obtener_por_producto(producto_id, session)


@router.delete("/{producto_id}/{categoria_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_relacion(
    producto_id: int = Path(..., gt=0),
    categoria_id: int = Path(..., gt=0),
    session: Session = Depends(get_session),
):
    eliminada = services.eliminar(producto_id, categoria_id, session)
    if not eliminada:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Relación no encontrada")
