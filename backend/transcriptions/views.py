import urllib.request
from urllib.parse import quote
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from .models import Transcription
from .serializers import TranscriptionSerializer


@api_view(['GET', 'POST'])
def store_text(request):
    if request.method == 'POST':
        serializer = TranscriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    transcriptions = Transcription.objects.all()
    serializer = TranscriptionSerializer(transcriptions, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_text(request, pk):
    try:
        transcription = Transcription.objects.get(pk=pk)
    except Transcription.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    transcription.delete()
    transcriptions = Transcription.objects.all()
    serializer = TranscriptionSerializer(transcriptions, many=True)
    return Response(serializer.data)


def tts(request):
    text = request.GET.get('text', '').strip()
    lang = request.GET.get('lang', 'en')
    if not text:
        return HttpResponse(status=400)
    url = f'https://translate.google.com/translate_tts?ie=UTF-8&q={quote(text)}&tl={lang}&client=tw-ob'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            audio = resp.read()
        return HttpResponse(audio, content_type='audio/mpeg')
    except Exception as e:
        return HttpResponse(str(e), status=502)
