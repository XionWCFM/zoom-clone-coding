
let a = 3
let b = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]

function solution(n, computers) {
    let answer = 0;
    let visit = []; 
    

    for(let i=0; i<n; i++){
        visit.push(false);
        console.log(visit)
    }
    
    function DFS(idx){
        visit[idx] = true;
        
        for(let i=0; i<n; i++){

            if(computers[idx][i] === 1 && !visit[i]){
                DFS(i);
            }
        }
    }
    
    for(let i=0; i<n; i++){
        if(!visit[i]){
            DFS(i);
            answer++;
        }
    }
    return answer;
}

solution(a,b)