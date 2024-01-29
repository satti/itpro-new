from django.contrib import admin
from .models import Staff,Timetable

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ['id','staffid','name']

@admin.register(Timetable)
class TimetableAdmin(admin.ModelAdmin):
    list_display = ['id','staff','day','start_time','end_time','start_date']

