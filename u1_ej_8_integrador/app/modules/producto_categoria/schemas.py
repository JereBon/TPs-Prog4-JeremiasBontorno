from pydantic import BaseModel, ConfigDict


class ProductoCategoriaCreate(BaseModel):
    producto_id: int
    categoria_id: int


class ProductoCategoriaRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    producto_id: int
    categoria_id: int
