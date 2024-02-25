from django.urls import path
from graphene_django.views import GraphQLView
from .schema import schema
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    # path('', RecipeStepListView.as_view(), name='RecipeStepListView'),
    # path('<int:id>', RecipeStepDetailView.as_view(), name='RecipeStepDetailView'),
    # path('<int:id>/', RecipeStepDetailView.as_view(), name='RecipeStepDetailView'),

    # path('graphql', csrf_exempt(GraphQLView.as_view(schema=schema, graphiql=True)), name='RecipeStepGraphQL'),
    path('', csrf_exempt(GraphQLView.as_view(schema=schema, graphiql=True)), name='GroupPayAppGraphQL'),
]