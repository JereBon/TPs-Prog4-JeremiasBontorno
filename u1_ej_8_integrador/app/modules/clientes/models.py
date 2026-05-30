from typing import Optional
from sqlmodel import SQLModel, Field


class Cliente(SQLModel, table=True):
    __tablename__ = "clientes"

    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    email: str = Field(index=True)
    telefono: Optional[str] = None
    tipo_cliente: str
    gasto_total: float = Field(default=0.0)
    activo: bool = Field(default=True)
