class ApiFeature {
  constructor(query, queryString) {
    (this.query = query), (this.queryString = queryString);
  }
  
  filter() {

    let queryStringObject = { ...this.queryString };
    let queryStringToExclude = [ "sort","fields","page","limit"];
    queryStringToExclude.forEach((elm) => delete queryStringObject[elm]);
    let queryStringObjectToString = JSON.stringify(queryStringObject).replace(
      /\b(gte|lte|lt|regex)\b/g,
      (match) => `$${match}`
    );
    let backToQueryStringObject = JSON.parse(queryStringObjectToString);
    this.query = this.query.find(backToQueryStringObject);
    return this;
  }

  sorting(){
    if(this.queryString.sort){
      console.log(this.queryString.sort)
      let sortingCondition=this.queryString.sort.split(',').join(" ")
    this.query=this.query.sort(sortingCondition)
    }
    return this;
  }

  fields(){
    if(this.queryString.fields){
      let limitingCondition=this.queryString.fields.split(' ').join(" ");
      this.query=this.query.select(limitingCondition)
    }
    return this;
  }

  pagination(){
    const productLimitToShow=this.queryString.limit*1||10;
    const pageNumber=this.queryString.pageNumber*1||1;
    const skipCondition=(pageNumber-1)*productLimitToShow;
    if(this.queryString.page){
      this.query.skip(skipCondition).limit(productLimitToShow)
    }
    return this
  }
}

module.exports = ApiFeature;
