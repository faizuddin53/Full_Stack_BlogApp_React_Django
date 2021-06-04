from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('MainBlog.urls'))
]

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'), name='index')]
# For included Media Files
urlpatterns = urlpatterns + \
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
