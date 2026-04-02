from django.db import models


class Transcription(models.Model):
    inputText = models.TextField()
    inputLang = models.CharField(max_length=10, default='ta')
    outputText = models.TextField()
    hindiText = models.TextField(default='')
    mostFrequentlyUsedWord = models.CharField(max_length=500)
    uniqueWords = models.JSONField(default=list)

    class Meta:
        ordering = ['id']
