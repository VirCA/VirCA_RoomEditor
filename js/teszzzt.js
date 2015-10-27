ori = {
    ypr: {
        roll: "2",
        pitch: "2",
        yaw: "2"
    }
}
ori2 = {
    rotMatrix: {
        xx: "1",
        xy: "2",
        xz: "2",
        yx: "1",
        yy: "2",
        yz: "2",
        zx: "1",
        zy: "2",
        zz: "2"
    }
}
ori3 = {
    angleAxis: {
        angle: "1",
        axis:{
            x: "1",
            y:"1",
            z: "1"
        }
    }
}
Convert2Quaternion(ori);

Convert2Quaternion(ori2);
Convert2Quaternion(ori3);


function Convert2Quaternion(orientation){
    var newOri = {
        quaternion:{
            w: undefined,
            x: undefined,
            y: undefined,
            z: undefined
        }
    }
    if(orientation.ypr != undefined){
        newOri.quaternion.w = Math.cos((orientation.ypr.roll)/2)*Math.cos((orientation.ypr.pitch)/2)*Math.cos((orientation.ypr.yaw)/2) + Math.sin((orientation.ypr.roll)/2)*Math.sin((orientation.ypr.pitch)/2)*Math.sin((orientation.ypr.yaw)/2);
        newOri.quaternion.x = Math.sin((orientation.ypr.roll)/2)*Math.cos((orientation.ypr.pitch)/2)*Math.cos((orientation.ypr.yaw)/2) - Math.cos((orientation.ypr.roll)/2)*Math.sin((orientation.ypr.pitch)/2)*Math.sin((orientation.ypr.yaw)/2);
        newOri.quaternion.y = Math.cos((orientation.ypr.roll)/2)*Math.sin((orientation.ypr.pitch)/2)*Math.cos((orientation.ypr.yaw)/2) + Math.sin((orientation.ypr.roll)/2)*Math.cos((orientation.ypr.pitch)/2)*Math.sin((orientation.ypr.yaw)/2);
        newOri.quaternion.z = Math.cos((orientation.ypr.roll)/2)*Math.cos((orientation.ypr.pitch)/2)*Math.sin((orientation.ypr.yaw)/2) - Math.sin((orientation.ypr.roll)/2)*Math.sin((orientation.ypr.pitch)/2)*Math.cos((orientation.ypr.yaw)/2);
    }
    else if(orientation.angleAxis != undefined){
        newOri.quaternion.w = Math.cos(orientation.angleAxis.angle/2);
        newOri.quaternion.x = orientation.angleAxis.axis.x * Math.sin(orientation.angleAxis.angle/2);
        newOri.quaternion.y = orientation.angleAxis.axis.y * Math.sin(orientation.angleAxis.angle/2);
        newOri.quaternion.z = orientation.angleAxis.axis.z * Math.sin(orientation.angleAxis.angle/2);

    }
    else if(orientation.rotMatrix != undefined){
        newOri.quaternion.w = Math.sqrt(1+orientation.rotMatrix.xx + orientation.rotMatrix.yy + orientation.rotMatrix.zz)/2;
        var tmp = newOri.quaternion.w * 4;
        newOri.quaternion.x = (orientation.rotMatrix.zy - orientation.rotMatrix.yz) / tmp;
        newOri.quaternion.y = (orientation.rotMatrix.xz - orientation.rotMatrix.zx) / tmp;
        newOri.quaternion.z = (orientation.rotMatrix.yx - orientation.rotMatrix.xy) / tmp;
    }
    console.log(newOri);
}