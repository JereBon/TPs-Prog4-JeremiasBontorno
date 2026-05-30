from fastapi import APIRouter, HTTPException, Path, Query, status, Depends
from typing import List, Optional
from sqlmodel import Session
from app.database import get_session
from . import schemas, services

router = APIRouter(prefix="/clientes", tags=["Clientes"])


@router.post("/", response_model=schemas.ClienteRead, status_code=status.HTTP_201_CREATED)
def alta_cliente(cliente: schemas.ClienteCreate, session: Session = Depends(get_session)):
    return services.crear(cliente, session)


@router.get("/", response_model=List[schemas.ClienteRead], status_code=status.HTTP_200_OK)
def listar_clientes(
    skip: int = Query(0, ge=0, description="Registros a saltar"),
    limit: int = Query(10, le=50, description="Límite por página"),
    tipo_cliente: Optional[str] = Query(None, description="Filtrar por VIP, Regular o Mayorista"),
    session: Session = Depends(get_session),
):
    return services.obtener_todos(skip, limit, session, tipo_cliente)


@router.get("/{id}", response_model=schemas.ClienteRead, status_code=status.HTTP_200_OK)
def detalle_cliente(id: int = Path(..., gt=0), session: Session = Depends(get_session)):
    cliente = services.obtener_por_id(id, session)
    if not cliente:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente no encontrado")
    return cliente


@router.put("/{id}", response_model=schemas.ClienteRead, status_code=status.HTTP_200_OK)
def actualizar_cliente(
    cliente: schemas.ClienteCreate,
    id: int = Path(..., gt=0),
    session: Session = Depends(get_session),
):
    actualizado = services.actualizar_total(id, cliente, session)
    if not actualizado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente no encontrado")
    return actualizado


@router.put("/{id}/desactivar", response_model=schemas.ClienteRead, status_code=status.HTTP_200_OK)
def desactivar_cliente(id: int = Path(..., gt=0), session: Session = Depends(get_session)):
    desactivado = services.desactivar(id, session)
    if not desactivado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente no encontrado")
    return desactivado


@router.get("/{id}/beneficios", response_model=schemas.BeneficiosResponse, status_code=status.HTTP_200_OK)
def consultar_beneficios(id: int = Path(..., gt=0), session: Session = Depends(get_session)):
    resultado = services.obtener_beneficios(id, session)
    if not resultado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente no encontrado")
    return resultado
