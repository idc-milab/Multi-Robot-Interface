const defaultBothSides = {
    'min': -1,
    'max': 1,
    'step': 0.05
}

const defaultDuration = {
    'min': 0,
    'max': 50000,
    'step': 500
}

const defaultSettings = {
    'speed': {
        'min': 0,
        'max': 1,
        'step': 0.05
    },
    'duration': defaultDuration
}

const defaultRGB = {
    'min': 0,
    'max': 255,
    'step': 1
}

export const Commands: any = {
    'forward': defaultSettings,
    'backward': defaultSettings,
    'goLeft': defaultSettings,
    'goRight': defaultSettings,
    'turnLeft': defaultSettings,
    'turnRight': defaultSettings,
    'extendUp': defaultSettings,
    'squatDown': defaultSettings,
    'leanLeft': defaultSettings,
    'leanRight': defaultSettings,
    'twistLeft': defaultSettings,
    'twistRight': defaultSettings,
    'lookDown': defaultSettings,
    'lookUp': defaultSettings,
    'resetBody': {},
    'go': {
        'LRspeed': defaultBothSides,
        'tLRspeed': defaultBothSides,
        'BFspeed': defaultBothSides,
        'duration': defaultDuration
    },
    'led': {
        'r': defaultRGB,
        'g': defaultRGB,
        'b': defaultRGB
    },
    'pose': {
        'leanLRamount': defaultBothSides,
        'tLRamount': defaultBothSides,
        'lookUDamount': defaultBothSides,
        'ESamount': defaultBothSides,
        'duration': defaultDuration
    }
};