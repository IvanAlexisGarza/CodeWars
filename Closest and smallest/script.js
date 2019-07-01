
function closest(strng) {
    if (strng == "") return [];

    var values = [];
    var weights = [];
    var results = [];
    values = strng.split(' ');

    for (var i = 0; i < values.length; i++) {
        weights[i] = values[i].split("").reduce(((a, b) => a + +b), 0);
        results.push([weights[i], i, +values[i]]);
    }

    var diff;
    results.sort((a, b) => { diff = a[0] - b[0]; if (diff === 0) return a[1] - b[1]; return diff });

    var smallestDiff = {}, currDiff;
    smallestDiff.values = [];

    for (var i = 0; i < results.length - 2; i++) {
        currDiff = Math.abs(results[i][0] - results[i + 1][0])
        if (currDiff == 0) return [results[i], results[i + 1]]

        if (smallestDiff.difference) {
            if (currDiff < smallestDiff.difference) {
                smallestDiff.difference = currDiff;
                smallestDiff.values[0] = results[i];
                smallestDiff.values[1] = results[i + 1];
            }
        } else {
            smallestDiff.difference = currDiff;
        }
    }
    return smallestDiff.values;
}


def closest(strng):
    majorList=[]
    for pos,value in enumerate(strng.split()):
        majorList.append(weights(value,pos))
    majorList = sorted(majorList)
    result = sorted(majorList[0:2])
    for i in range(len(majorList)):
        for j in range(len(majorList)):
            if majorList[i] == majorList[j]:
                continue
            else:
                temp = sorted([majorList[i],majorList[j]])
                if temp == result:
                    continue
                else:
                    result = bestScore(result,temp)
    return result
  
  def weights(num,pos):
    res = 0
    for i in num:
        res += int(i)
    result = (res, pos, int(num))
    return result
  
  
  def bestScore(set1,set2):
    res = []
    for i in set1, set2:
        weightDiff = abs(i[0][0]-i[1][0])
        weight = i[0][0]+i[1][0]
        posSum = i[0][1]+i[1][1]
        res.append([weightDiff, weight, posSum])
    if res[0][0] < res[1][0]:
        return [list(set1[0]),list(set1[1])]    
    if res[0][0] == res[1][0] and res[0][1] < res[1][1]:
        return [list(set1[0]),list(set1[1])]
    if res[0][0] == res[1][0] and res[0][1] == res[1][1] and res[0][2] < res[1][2]:
        return [list(set1[0]),list(set1[1])]   
    return [list(set2[0]),list(set2[1])]


    def closest(s):
    wght = sorted([ [sum(int(c) for c in n), i, int(n)] for i, n in enumerate(s.split()) ], key=lambda k: (k[0], k[1]))
    diff = [ abs(a[0] - b[0]) for a, b in zip(wght, wght[1:]) ]
    return  [ wght [diff.index(min(diff)) ], wght [diff.index(min(diff)) + 1] ] if wght else []

    INTERACT_PH1 , FALSE , string;  INTERACT_PH2 , FALSE , string; INTERACT_PH4 , FALSE , string;  INTERACT_PH5 , US , string;  INTERACT_PH7 , eCommerce - CART , string;  INTERACT_PC1 , 0.0 , numeric;  INTERACT_PC2 , <null> , string;  INTERACT_PC4 , 0.0 , numeric;  INTERACT_PS1 , NULL , string;  CID , NULL , string;  INTERACT_PH8 , /home , string;  INTERACT_PH6 , anonymous , string;