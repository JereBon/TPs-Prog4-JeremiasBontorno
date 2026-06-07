from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class DetallePedidoCreate(BaseModel):
    producto_id: int
    cantidad: int
    precio_snapshot: float
    nombre_snapshot: str


class DetallePedidoRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    pedido_id: int
    producto_id: int
    cantidad: int
    precio_snapshot: float
    nombre_snapshot: str


class PedidoCreate(BaseModel):
    estado: str = "pendiente"
    total: float = 0.0
    detalles: List[DetallePedidoCreate] = []


class PedidoUpdate(BaseModel):
    estado: Optional[str] = None
    total: Optional[float] = None


class PedidoRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    estado: str
    total: float
    fecha_creacion: datetime
