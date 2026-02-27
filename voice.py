import sounddevice as sd
from scipy.io.wavfile import write

fs = 44100  # sample rate
seconds = 5  # record duration

print("Speak now...")
recording = sd.rec(int(seconds * fs), samplerate=fs, channels=1)
sd.wait()

write("voice.wav", fs, recording)

print("Recording saved as voice.wav")