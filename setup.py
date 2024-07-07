from setuptools import setup, find_packages

setup(
    name='my_package',
    version='1.0.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'flask',
        'deepface',
        # Add any other dependencies here
    ],
    entry_points={
        'console_scripts': [
            'my_package = my_package.__main__:main',
        ],
    },
)
