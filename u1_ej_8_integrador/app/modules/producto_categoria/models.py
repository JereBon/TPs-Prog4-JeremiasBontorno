from sqlmodel import SQLModel, Field


class ProductoCategoria(SQLModel, table=True):
    __tablename__ = "producto_categorias"

    producto_id: int = Field(foreign_key="productos.id", primary_key=True)
    categoria_id: int = Field(foreign_key="categorias.id", primary_key=True)
