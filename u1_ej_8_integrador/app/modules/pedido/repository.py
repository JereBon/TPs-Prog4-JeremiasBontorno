from typing import List
from sqlmodel import Session, select
from app.core.repository import BaseRepository
from .models import DetallePedido, Pedido


class PedidoRepository(BaseRepository[Pedido]):
    def __init__(self, session: Session):
        super().__init__(Pedido, session)


class DetallePedidoRepository(BaseRepository[DetallePedido]):
    def __init__(self, session: Session):
        super().__init__(DetallePedido, session)

    def get_by_pedido(self, pedido_id: int) -> List[DetallePedido]:
        return self.session.exec(
            select(DetallePedido).where(DetallePedido.pedido_id == pedido_id)
        ).all()
