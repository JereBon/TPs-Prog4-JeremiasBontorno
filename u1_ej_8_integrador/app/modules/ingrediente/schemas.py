from typing import Optional
from pydantic import BaseModel, ConfigDict


class IngredienteCreate(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    es_alergeno: bool = False


class IngredienteUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    es_alergeno: Optional[bool] = None


class IngredienteRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nombre: str
    descripcion: Optional[str]
    es_alergeno: bool
