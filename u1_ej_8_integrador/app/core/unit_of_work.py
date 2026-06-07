from sqlmodel import Session


class UnitOfWork:
    def __init__(self, session: Session):
        self.session = session

    def commit(self):
        self.session.commit()

    def rollback(self):
        self.session.rollback()

    def refresh(self, instance):
        self.session.refresh(instance)
