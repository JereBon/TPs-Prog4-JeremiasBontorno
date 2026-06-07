from sqlmodel import Session
from app.core.repository import BaseRepository
from .models import Ingrediente


class IngredienteRepository(BaseRepository[Ingrediente]):
    def __init__(self, session: Session):
        super().__init__(Ingrediente, session)
