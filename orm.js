let registeredTypes = [];

export function typeRegister(name, module) {
    return setRegisterType(name,module, registeredTypes);
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
    return getType(name).getOrm(options);
}