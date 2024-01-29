from django.db import models

class Staff(models.Model):
    staffid = models.IntegerField(unique=True)
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name

class Timetable(models.Model):
    staff = models.ForeignKey(Staff,on_delete=models.CASCADE)
    day = models.CharField(max_length=10)
    start_time = models.TimeField()
    end_time = models.TimeField()
    start_date = models.DateField()

