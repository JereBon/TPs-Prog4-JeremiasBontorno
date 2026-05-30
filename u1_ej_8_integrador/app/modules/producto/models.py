from typing import Optional
from sqlmodel import SQLModel, Field


class Producto(SQLModel, table=True):
    __tablename__ = "productos"

    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    categoria: str
    precio: float
    stock: int
    stock_minimo: int
    activo: bool = Field(default=True)
