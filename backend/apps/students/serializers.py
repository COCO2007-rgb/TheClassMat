from rest_framework import serializers
from students.models import Student, Remark

class StudentSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    batch_ids = serializers.SerializerMethodField(read_only=True)
    batch_name = serializers.SerializerMethodField(read_only=True)
    batch_fees = serializers.SerializerMethodField(read_only=True)
    name = serializers.CharField(source='first_name', read_only=True)
    mobile = serializers.CharField(source='student_contact', read_only=True)

    class Meta:
        model = Student
        fields = [
            'id', 'student_id', 'coaching_center', 'first_name', 'surname',
            'father_name', 'mother_name',
            'gender', 'dob', 'student_contact', 'parent_contact', 'address',
            'joining_date', 'batch', 'is_archived', 'batch_ids', 'batch_name', 'batch_fees', 'name', 'mobile'
        ]

    def get_batch_ids(self, obj):
        return [str(obj.batch.id)] if obj.batch else []

    def get_batch_name(self, obj):
        return obj.batch.name if obj.batch else "N/A"

    def get_batch_fees(self, obj):
        return obj.batch.fees if obj.batch else 0.0

class RemarkSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = Remark
        fields = '__all__'
