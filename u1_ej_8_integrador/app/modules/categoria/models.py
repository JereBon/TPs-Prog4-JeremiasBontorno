from typing import Optional
from sqlmodel import SQLModel, Field


class Categoria(SQLModel, table=True):
    __tablename__ = "categorias"

    id: Optional[int] = Field(default=None, primary_key=True)
    codigo: str = Field(index=True)
    descripcion: str
    activo: bool = Field(default=True)
