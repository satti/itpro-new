from django.shortcuts import render
from rest_framework import viewsets
from .models import Staff,Timetable
from .serializers import TimetableSerializer, StaffSerializer
from rest_framework.response import Response
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from datetime import datetime

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class TimetableViewSet(viewsets.ModelViewSet):
    queryset = Timetable.objects.all()
    serializer_class = TimetableSerializer

    def create(self, request,*args,**kwargs):
        data = request.data.copy()
        #print(type(data))
        #print(data)
        #staffid = data.get('staff',None)
        #print("staff id is: ",staffid)
        #data['staff'] = Staff.objects.get(id=staffid)
        sttime = data.get('start_time').split(':')
        if int(sttime[0])<6:
            sttime[0] = int(sttime[0])+12
            data['start_time'] = sttime[0]+':'+sttime[1]
        else:
            data['start_time'] = data.get('start_time')
        edtime = data.get('end_time').split(':')
        if int(edtime[0])<6:
            edtime[0] = int(edtime[0]) + 12
            data['end_time'] = edtime[0]+':'+edtime[1]
        else:
            data['end_time'] = data.get('end_time')
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    def list(self,request,*args,**kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset,many=True)
        #print(serializer.data)
        d = serializer.data
        for n in d:
            n['staff'] = Staff.objects.filter(id=n['staff']).values()[0]['name']
        return Response(d)
    
    @action(detail=False,methods=['get'])
    def staff_engaged(self,request):
        request_date = self.request.query_params.get('date',None)
        print(request_date)
        date_object = datetime.strptime(request_date,'%Y-%m-%d')
        day = date_object.strftime('%A')
        queryset = Timetable.objects.filter(day=day)
        serializer = self.get_serializer(queryset,many=True)
        print(serializer.data)
        d = serializer.data
        for n in d:
            n['staff'] = Staff.objects.filter(id=n['staff']).values()[0]['name']
        return Response(d)
    
