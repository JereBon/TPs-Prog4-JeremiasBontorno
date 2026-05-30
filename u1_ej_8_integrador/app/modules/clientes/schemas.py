from pydantic import BaseModel, Field, ConfigDict
from typing import Optional


class ClienteBase(BaseModel):
    nombre: str = Field(..., min_length=3, description="Nombre completo del cliente", example="Juan Perez")
    email: str = Field(..., pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$", description="Correo electrónico válido", example="juan@email.com")
    telefono: Optional[str] = Field(None, example="+54 11 1234 5678")
    tipo_cliente: str = Field(..., pattern=r"^(VIP|Regular|Mayorista)$", description="Debe ser VIP, Regular o Mayorista", example="VIP")
    gasto_total: float = Field(0.0, ge=0.0, description="Cantidad total gastada por el cliente", example=1500.50)
    activo: bool = True


class ClienteCreate(ClienteBase):
    pass


class ClienteUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=3)
    email: Optional[str] = Field(None, pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$")
    telefono: Optional[str] = None
    tipo_cliente: Optional[str] = Field(None, pattern=r"^(VIP|Regular|Mayorista)$")
    gasto_total: Optional[float] = Field(None, ge=0.0)
    activo: Optional[bool] = None


class ClienteRead(ClienteBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class BeneficiosResponse(BaseModel):
    descuento_porcentaje: float
    envio_gratis: bool
    atencion_prioritaria: bool
