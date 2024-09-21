from setuptools import setup, find_packages

with open("requirements.txt") as f:
    requires = f.read().splitlines()

setup(
    name='realtime_chat_system',
    version='0.1.0',
    author='t4ned4',
    author_email='taneda.bp@gmail.com',
    description='necessary libraries for realtime-chat-system',
    url='https://github.com/t4ned4/realtime-chat-system',
    packages=find_packages(),
    install_requires=requires,
)
