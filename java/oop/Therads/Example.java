class SharedData{
    private int Data=0;
    private boolean hasData=false;
    public synchronized void producer(int value){
        while(hasData){
            try{
                wait();
            }catch(InterruptedException e){}
        }
            Data=value;
            System.out.println("producer:"+value);
            hasData=true;
            notify();
    }
    public synchronized int costumer(){
        while(!hasData){
            try{
                wait();
            }catch(InterruptedException e){}
        }
        System.out.println("costumer:"+Data);
        hasData=false;
        notify();
        return Data;
    }
}
public class Example {
    public static void main(String[] args) {
        SharedData shared=new SharedData();
        Thread producer = new Thread(()->{
            for(int i=0;i<=5;i++){
                shared.producer(i);
            }
        });
        Thread costumer = new Thread(()->{
            for(int i=0;i<=5;i++){
                shared.costumer();
            }  });

        producer.start();
        costumer.start();
        
    }
}
