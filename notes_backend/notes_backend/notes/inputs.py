import graphene

class NoteInput(graphene.InputObjectType):
    title = graphene.String()
    content = graphene.String()
