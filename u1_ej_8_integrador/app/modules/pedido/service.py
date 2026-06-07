from typing import List, Optional
from .models import DetallePedido, Pedido
from .schemas import DetallePedidoRead, PedidoCreate, PedidoRead, PedidoUpdate
from .unit_of_work import PedidoUnitOfWork


def crear(data: PedidoCreate, uow: PedidoUnitOfWork) -> PedidoRead:
    pedido = Pedido(estado=data.estado, total=data.total)
    uow.pedidos.add(pedido)
    uow.commit()
    uow.refresh(pedido)

    for detalle_data in data.detalles:
        detalle = DetallePedido(pedido_id=pedido.id, **detalle_data.model_dump())
        uow.detalles.add(detalle)
    uow.commit()

    return PedidoRead.model_validate(pedido)


def listar(uow: PedidoUnitOfWork) -> List[PedidoRead]:
    return [PedidoRead.model_validate(p) for p in uow.pedidos.get_all()]


def obtener(id: int, uow: PedidoUnitOfWork) -> Optional[PedidoRead]:
    pedido = uow.pedidos.get_by_id(id)
    if not pedido:
        return None
    return PedidoRead.model_validate(pedido)


def obtener_detalles(pedido_id: int, uow: PedidoUnitOfWork) -> List[DetallePedidoRead]:
    return [DetallePedidoRead.model_validate(d) for d in uow.detalles.get_by_pedido(pedido_id)]


def actualizar(id: int, data: PedidoUpdate, uow: PedidoUnitOfWork) -> Optional[PedidoRead]:
    pedido = uow.pedidos.get_by_id(id)
    if not pedido:
        return None
    for campo, valor in data.model_dump(exclude_none=True).items():
        setattr(pedido, campo, valor)
    uow.pedidos.add(pedido)
    uow.commit()
    uow.refresh(pedido)
    return PedidoRead.model_validate(pedido)


def eliminar(id: int, uow: PedidoUnitOfWork) -> bool:
    pedido = uow.pedidos.get_by_id(id)
    if not pedido:
        return False
    for detalle in uow.detalles.get_by_pedido(id):
        uow.detalles.delete(detalle)
    uow.pedidos.delete(pedido)
    uow.commit()
    return True
