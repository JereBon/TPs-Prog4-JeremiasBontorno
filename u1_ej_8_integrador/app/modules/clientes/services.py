from typing import List, Optional
from sqlmodel import Session, select
from .models import Cliente
from .schemas import ClienteCreate, ClienteRead, BeneficiosResponse


def crear(data: ClienteCreate, session: Session) -> ClienteRead:
    nuevo = Cliente(**data.model_dump())
    session.add(nuevo)
    session.commit()
    session.refresh(nuevo)
    return ClienteRead.model_validate(nuevo)


def obtener_todos(skip: int, limit: int, session: Session, tipo_cliente: Optional[str] = None) -> List[ClienteRead]:
    statement = select(Cliente)
    if tipo_cliente:
        statement = statement.where(Cliente.tipo_cliente == tipo_cliente)
    statement = statement.offset(skip).limit(limit)
    clientes = session.exec(statement).all()
    return [ClienteRead.model_validate(c) for c in clientes]


def obtener_por_id(id: int, session: Session) -> Optional[ClienteRead]:
    cliente = session.get(Cliente, id)
    if not cliente:
        return None
    return ClienteRead.model_validate(cliente)


def actualizar_total(id: int, data: ClienteCreate, session: Session) -> Optional[ClienteRead]:
    cliente = session.get(Cliente, id)
    if not cliente:
        return None
    for campo, valor in data.model_dump().items():
        setattr(cliente, campo, valor)
    session.add(cliente)
    session.commit()
    session.refresh(cliente)
    return ClienteRead.model_validate(cliente)


def desactivar(id: int, session: Session) -> Optional[ClienteRead]:
    cliente = session.get(Cliente, id)
    if not cliente:
        return None
    cliente.activo = False
    session.add(cliente)
    session.commit()
    session.refresh(cliente)
    return ClienteRead.model_validate(cliente)


def obtener_beneficios(id: int, session: Session) -> Optional[BeneficiosResponse]:
    cliente = session.get(Cliente, id)
    if not cliente:
        return None

    descuento = 0.0
    envio = False
    prioridad = False

    if cliente.tipo_cliente == "VIP":
        descuento = 20.0
        envio = True
        prioridad = True
    elif cliente.tipo_cliente == "Mayorista":
        descuento = 15.0
        envio = True
        prioridad = False
    elif cliente.tipo_cliente == "Regular":
        descuento = 5.0
        envio = False
        prioridad = False

    if cliente.gasto_total > 10000:
        descuento += 5.0

    return BeneficiosResponse(
        descuento_porcentaje=descuento,
        envio_gratis=envio,
        atencion_prioritaria=prioridad,
    )
