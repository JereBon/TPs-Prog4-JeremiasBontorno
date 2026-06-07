from typing import Optional
from sqlmodel import SQLModel, Field


class Ingrediente(SQLModel, table=True):
    __tablename__ = "ingredientes"

    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(index=True)
    descripcion: Optional[str] = None
    es_alergeno: bool = Field(default=False)
