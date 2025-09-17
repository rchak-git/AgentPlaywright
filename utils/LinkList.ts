export class LinkNode <T>
{
  value ?: T;
  next ?: LinkNode<T> ;

  constructor (value:T)
  {
    this.value = value;
  }

}


export class LinkList <T>
{

    head ?: LinkNode <T>;
    tail ?: LinkNode<T>;
    length : number =0;

     addNode (value: T)
     {
        let currNode: LinkNode<T>;
        currNode = new LinkNode(value);
       if (!this.head) 
       {
         this.head = currNode;
         this.tail = currNode;
        
       }
        else
        {
       this.tail!.next = currNode;
       this.tail = currNode;
        }
       this.length ++;

     }

    printNodes()
    {
      let tempNode = this.head;

      while (tempNode)
      {
        console.log (tempNode.value);
        tempNode = tempNode.next;
      }

    }


}