from django.shortcuts import render
from rest_framework import viewsets
from .models import Staff,Timetable
from .serializers import TimetableSerializer, StaffSerializer,TimetableCreateSerializer
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

    def get_serializer_class(self):
        if self.action == 'duplicate_check':
            return TimetableCreateSerializer
        else:
            return TimetableSerializer

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
            n['staff_name'] = Staff.objects.filter(id=n['staff']).values()[0]['name']
            n['start_time'] = n['start_time'][0:5]
        print(d)
        return Response(d)

    @action(detail=False,methods=['get'])
    def duplicate_check(self,request):
        staffid = self.request.query_params.get('staff',None)
        day = self.request.query_params.get('day',None)
        start_time = self.request.query_params.get('start_time',None)
        if start_time:
            si = start_time.split(':')
            if int(si[0])<6:
                si[0] = int(si[0])+12
                start_time = si[0]+':'+si[1]
        else:
            start_time = start_time
        end_time = self.request.query_params.get('end_time',None)

        if end_time:
            et = end_time.split(':')
            if int(et[0])<6:
                et[0] = int(et[0])+12
                end_time = et[0]+':'+et[1]
        else:
            end_time = end_time

        start_date = self.request.query_params.get('start_date',None)
        request_data = Timetable.objects.filter(staff_id=staffid,
        day=day)
        # removed_value = []
        # if len(request_data) > 1:
        #     for dic in request_data:
        #         removed_value.append(dic.pop('staff_id'))
        # else:
        #     removed_value.append(request_data.pop('staff_id'))
        print(start_time,request_data)
        serializer = self.get_serializer(request_data,many=True)
        print("serialized data",serializer.data)
        return Response(serializer.data)
    
