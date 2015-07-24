let registeredTypes = [];

export function typeRegister(name, ormInterface) {
    return setRegisterType(name, ormInterface, registeredTypes);
}

function setRegisterType(name, type, register){
    register[name] = type;
    return true;
}

export function getType(name){
    return getRegisterType(name, registeredTypes);
}

function getRegisterType(name, register){
    return register[name];
}

export function Fabric(name, options){
    return getType(name).Fabric(options);
}
