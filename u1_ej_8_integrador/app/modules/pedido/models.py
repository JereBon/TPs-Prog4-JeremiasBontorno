from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field


class Pedido(SQLModel, table=True):
    __tablename__ = "pedidos"

    id: Optional[int] = Field(default=None, primary_key=True)
    estado: str = Field(default="pendiente")
    total: float = Field(default=0.0)
    fecha_creacion: datetime = Field(default_factory=datetime.utcnow)


class DetallePedido(SQLModel, table=True):
    __tablename__ = "detalle_pedidos"

    id: Optional[int] = Field(default=None, primary_key=True)
    pedido_id: int = Field(foreign_key="pedidos.id")
    producto_id: int = Field(foreign_key="productos.id")
    cantidad: int
    precio_snapshot: float
    nombre_snapshot: str
