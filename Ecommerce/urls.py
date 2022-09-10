from django.urls import path
from Ecommerce.views import product_views as pviews
from Ecommerce.views import user_views as uviews
from Ecommerce.views import order_views as oviews
 

urlpatterns = [
    
    path('users/login', uviews.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register', uviews.registerUser, name="register"),
    path('users', uviews.getUsers, name="users"),
    path('users/profile', uviews.getUserProfile, name="user-profile"),
    path('users/update', uviews.updateUserProfile, name="user-profile-update"),
    path('users/<str:pk>', uviews.getUserById, name='user'),
    path('users/update/<str:pk>', uviews.updateUser, name='user-update'),
    path('users/delete/<str:pk>', uviews.deleteUser, name='user-delete'),
 
    path('products/', pviews.Products, name="products"),
    path('products/create', pviews.createProduct, name="product-create"),
    path('products/upload', pviews.uploadImage, name="image-upload"),
    path('products/<str:pk>/reviews', pviews.createProductReview),
    path('products/top', pviews.getTopProducts),
    path('products/<str:pk>', pviews.getProduct),
    path('products/update/<str:pk>', pviews.updateProduct, name="update-products"),
    path('products/delete/<str:pk>', pviews.deleteProduct, name="delete-products"),

    path('order', oviews.getOrders, name='orders'),
    path('order/add', oviews.addOrderItems, name='orders-add'),
    path('order/myorders', oviews.getMyOrders, name='my-orders'),
    path('order/<str:pk>/deliver', oviews.updateOrderToDelivered, name='order-deliver'),
    path('order/<str:pk>', oviews.getOrderById, name='user-order'),
    path('order/<str:pk>/pay', oviews.updateOrderToPaid, name='pay'),
    
]