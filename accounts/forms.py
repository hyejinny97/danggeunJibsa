from django import forms
from .models import User, Pet
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import (
    UserCreationForm,
    UserChangeForm,
    PasswordChangeForm,
)
from django.contrib.auth.forms import ReadOnlyPasswordHashField

# 회원가입
class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = [
            "username",
            "last_name",
            "first_name",
            "age",
            "gender",
            "phone_num",
            "profile_image",
        ]
        labels = {
            "username": "아이디",
            "last_name": "성",
            "first_name": "이름",
            "age": "나이",
            "gender": "성별",
            "phone_num": "연락처",
            "profile_image": "프로필 이미지",
        }


# 회원 정보 수정
class CustomUserChangeForm(UserChangeForm):
    password = ReadOnlyPasswordHashField(label=(""), help_text="")

    class Meta:
        model = get_user_model()
        fields = [
            "username",
            "last_name",
            "first_name",
            "age",
            "gender",
            "phone_num",
            "profile_image",
        ]
        labels = {
            "username": "아이디",
            "last_name": "성",
            "first_name": "이름",
            "age": "나이",
            "gender": "성별",
            "phone_num": "연락처",
            "profile_image": "프로필 이미지 변경",
        }


# 비밀번호 변경
class CustomPasswordChangeForm(PasswordChangeForm):
    new_password1 = forms.CharField(
        label=("새 비밀번호"),
        widget=forms.PasswordInput(attrs={"autocomplete": "new-password"}),
        help_text=None,
    )


# 반려동물 등록
class CustomPetCreationForm(forms.ModelForm):
    class Meta:
        model = Pet
        fields = ["pet_image", "petname", "petage", "petgender", "neutralization"]
        labels = {
            "pet_image": "사진",
            "petname": "이름",
            "petage": "나이",
            "petgender": "성별",
            "neutralization": "중성화 여부",
            "species": "종",
        }


# 반려동물 정보 수정
class CustomPetChangeForm(forms.ModelForm):
    class Meta:
        model = Pet
        fields = ["pet_image", "petname", "petage", "petgender", "neutralization"]
        labels = {
            "pet_image": "사진",
            "petname": "이름",
            "petage": "나이",
            "petgender": "성별",
            "neutralization": "중성화 여부",
            "species": "종",
        }