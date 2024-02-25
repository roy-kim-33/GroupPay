from django.http import Http404
from django.db.models import Model

def get_model_or_404(model: Model, id):
    try:
        return model.objects.get(id=id)
    except model.DoesNotExist:
        raise Http404(f'{model} id={id} not found')
