from typing import Generic, TypeVar, Type, Optional, List
from sqlmodel import Session, SQLModel, select

ModelType = TypeVar("ModelType", bound=SQLModel)


class BaseRepository(Generic[ModelType]):
    def __init__(self, model: Type[ModelType], session: Session):
        self.model = model
        self.session = session

    def get_by_id(self, id: int) -> Optional[ModelType]:
        return self.session.get(self.model, id)

    def get_all(self, skip: int = 0, limit: int = 50) -> List[ModelType]:
        return self.session.exec(select(self.model).offset(skip).limit(limit)).all()

    def add(self, instance: ModelType) -> ModelType:
        self.session.add(instance)
        return instance

    def delete(self, instance: ModelType) -> None:
        self.session.delete(instance)
