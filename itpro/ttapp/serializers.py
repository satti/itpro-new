from rest_framework import serializers
from ttapp.models import Staff,Timetable

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class TimetableSerializer(serializers.ModelSerializer):
    #staff = StaffSerializer()
    class Meta:
        model = Timetable
        fields = ['id','staff','day','start_time','end_time','start_date']
'''
    def create(self,validated_data):
        staff_data = validated_data.pop('staff')
        staff_instance = Staff.objects.get_or_create(**staff_data)
        Timetable_instance = Timetable.objects.create(staff=staff_instance,**validated_data)
        return Timetable_instance'''