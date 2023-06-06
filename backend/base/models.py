from django.db import models
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User

class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fname = models.CharField(max_length=255)
    lname = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    question = models.CharField(max_length=255)
    question_answer = models.CharField(max_length=255)

    def str(self):
        return f"{self.fname}"


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    date = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to='static/product_images')

    def str(self):
        return f"{self.title}"


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def str(self):
        return f"{self.client} to {self.product}"


# class Feature(models.Model):
#     featureName = models.CharField(max_length=255)

#     def str(self):
#         return f"{self.featureName}"


# class Detail(models.Model):
#     detailName = models.CharField(max_length=255)
#     feature = models.ForeignKey(Feature, on_delete=models.CASCADE)

#     def str(self):
#         return f"{self.detailName}"


# class SpecifiedBy(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     feature = models.ForeignKey(Feature, on_delete=models.CASCADE)
#     featureValue = models.ForeignKey(Detail, on_delete=models.CASCADE)

#     def str(self):
#         return f"{self.product} has {self.feature}"