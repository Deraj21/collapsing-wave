const data = {
    "": {
        "nickname": "",
        "color": "darkgray",
        "all": [
            "water",
            "sand",
            "grass",
            "forest",
            "thick_forest"
        ]
    },
    "water": {
        "nickname": "wa",
        "color": "Turquoise",
        "weight": 2,
        "all": [
            "sand",
            "water"
        ]
    },
    "sand": {
        "nickname": "sa",
        "color": "Moccasin",
        "weight": 1,
        "all": [
            "water",
            "sand",
            "grass"
        ]
    },
    "grass": {
        "nickname": "gr",
        "color": "YellowGreen",
        "weight": 3,
        "all": [
            "grass",
            "sand",
            "forest"
        ]
    },
    "forest": {
        "nickname": "fo",
        "color": "ForestGreen",
        "weight": 3,
        "all": [
            "forest",
            "grass",
            "thick_forest"
        ]
    },
    "thick_forest": {
        "nickname": "tf",
        "color": "DarkSlateGray",
        "weight": 1,
        "all": [
            "thick_forest",
            "forest"
        ]
    }
}

export default data